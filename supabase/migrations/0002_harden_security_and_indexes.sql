revoke execute on function public.handle_new_user() from anon, authenticated;
revoke execute on function public.is_admin() from anon, authenticated;
revoke execute on function public.trim_golf_scores() from anon, authenticated;

create index if not exists audit_logs_actor_idx on public.audit_logs(actor_id,created_at desc);
create index if not exists draw_results_user_idx on public.draw_results(user_id);
create index if not exists user_preferences_charity_idx on public.user_preferences(charity_id);
