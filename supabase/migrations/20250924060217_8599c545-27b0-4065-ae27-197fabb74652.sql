-- Add INSERT policy for users to create their own wallets
CREATE POLICY "Users can create their own wallet" 
ON public.user_wallets 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Add UPDATE policy for users to manage their own wallets (for balance updates by admin)
CREATE POLICY "Users can update their own wallet" 
ON public.user_wallets 
FOR UPDATE 
USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role));