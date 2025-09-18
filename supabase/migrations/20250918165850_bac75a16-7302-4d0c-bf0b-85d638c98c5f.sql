-- Create wallet table for user balances
CREATE TABLE public.user_wallets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  balance DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  currency VARCHAR(3) NOT NULL DEFAULT 'USD',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create wallet transactions table
CREATE TABLE public.wallet_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  wallet_id UUID NOT NULL REFERENCES public.user_wallets(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('deposit', 'withdrawal', 'payment')),
  payment_method VARCHAR(20) DEFAULT 'whatsapp',
  whatsapp_number VARCHAR(20),
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  reference_id VARCHAR(100),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create identity verification table
CREATE TABLE public.identity_verifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  document_type VARCHAR(20) NOT NULL CHECK (document_type IN ('passport', 'residence_card', 'national_id', 'drivers_license')),
  document_front_url TEXT,
  document_back_url TEXT,
  verification_status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
  admin_notes TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES auth.users(id)
);

-- Enable RLS on all tables
ALTER TABLE public.user_wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.identity_verifications ENABLE ROW LEVEL SECURITY;

-- Wallet policies
CREATE POLICY "Users can view their own wallet" 
ON public.user_wallets 
FOR SELECT 
USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view all wallets" 
ON public.user_wallets 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Transaction policies
CREATE POLICY "Users can view their own transactions" 
ON public.wallet_transactions 
FOR SELECT 
USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can create their own transactions" 
ON public.wallet_transactions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all transactions" 
ON public.wallet_transactions 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Identity verification policies
CREATE POLICY "Users can view their own verification" 
ON public.identity_verifications 
FOR SELECT 
USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can create their own verification" 
ON public.identity_verifications 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own verification when pending" 
ON public.identity_verifications 
FOR UPDATE 
USING (auth.uid() = user_id AND verification_status = 'pending');

CREATE POLICY "Admins can manage all verifications" 
ON public.identity_verifications 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create storage bucket for identity documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('identity-documents', 'identity-documents', false);

-- Storage policies for identity documents
CREATE POLICY "Users can upload their own identity documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'identity-documents' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own identity documents" 
ON storage.objects 
FOR SELECT 
USING (
  bucket_id = 'identity-documents' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Admins can view all identity documents" 
ON storage.objects 
FOR SELECT 
USING (
  bucket_id = 'identity-documents' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Create function to create wallet on profile creation
CREATE OR REPLACE FUNCTION public.create_user_wallet()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_wallets (user_id, balance)
  VALUES (NEW.user_id, 0.00);
  RETURN NEW;
END;
$$;

-- Create trigger to create wallet when profile is created
CREATE TRIGGER create_wallet_on_profile_creation
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.create_user_wallet();

-- Add triggers for updating timestamps
CREATE TRIGGER update_user_wallets_updated_at
  BEFORE UPDATE ON public.user_wallets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_wallet_transactions_user_id ON public.wallet_transactions(user_id);
CREATE INDEX idx_wallet_transactions_status ON public.wallet_transactions(status);
CREATE INDEX idx_identity_verifications_user_id ON public.identity_verifications(user_id);
CREATE INDEX idx_identity_verifications_status ON public.identity_verifications(verification_status);