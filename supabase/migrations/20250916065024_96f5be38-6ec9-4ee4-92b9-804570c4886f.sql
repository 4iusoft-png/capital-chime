-- Add user activation status to profiles table
ALTER TABLE public.profiles 
ADD COLUMN is_active boolean NOT NULL DEFAULT true;

-- Add index for performance on active users queries
CREATE INDEX idx_profiles_is_active ON public.profiles(is_active);

-- Update RLS policies to ensure only admins can modify activation status
CREATE POLICY "Admins can update user activation status"
ON public.profiles
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));