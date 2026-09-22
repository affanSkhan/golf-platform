-- RLS policies call is_admin() during normal API queries.
-- Keep the function callable while it remains parameterless and auth.uid()-scoped.
grant execute on function public.is_admin() to anon, authenticated;
