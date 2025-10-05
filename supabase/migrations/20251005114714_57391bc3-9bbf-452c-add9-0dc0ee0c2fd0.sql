-- Update the wallet creation trigger to give $1000 bonus to non-admin users
CREATE OR REPLACE FUNCTION public.create_user_wallet()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  user_role app_role;
  initial_balance numeric;
BEGIN
  -- Get the user's role
  SELECT role INTO user_role
  FROM public.user_roles
  WHERE user_id = NEW.user_id
  LIMIT 1;
  
  -- Set initial balance based on role
  -- Admins get 0, regular users get 1000 as welcome bonus
  IF user_role = 'admin' THEN
    initial_balance := 0.00;
  ELSE
    initial_balance := 1000.00;
  END IF;
  
  -- Create wallet with appropriate balance
  INSERT INTO public.user_wallets (user_id, balance)
  VALUES (NEW.user_id, initial_balance);
  
  RETURN NEW;
END;
$function$;