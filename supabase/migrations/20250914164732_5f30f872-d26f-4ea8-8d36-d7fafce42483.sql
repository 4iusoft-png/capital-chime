-- Update the handle_new_user function to make upsteee@mail.com admin
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  user_email TEXT;
BEGIN
  -- Get email from auth.users or raw_user_meta_data
  user_email := COALESCE(
    NEW.email,
    NEW.raw_user_meta_data ->> 'email'
  );

  -- Insert into profiles with additional fields
  INSERT INTO public.profiles (
    user_id, 
    email, 
    first_name, 
    last_name,
    whatsapp_number,
    country,
    state,
    city
  )
  VALUES (
    NEW.id,
    user_email,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    NEW.raw_user_meta_data ->> 'whatsapp_number',
    NEW.raw_user_meta_data ->> 'country',
    NEW.raw_user_meta_data ->> 'state',
    NEW.raw_user_meta_data ->> 'city'
  );

  -- Check if this email should be an admin
  IF user_email = 'upsteee@mail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'user');
  END IF;

  RETURN NEW;
END;
$function$;