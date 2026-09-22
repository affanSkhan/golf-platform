-- Use initplan-friendly auth lookups in RLS policies.
-- The canonical policies are rebuilt below so auth.uid()/is_admin() are evaluated once per statement.

drop policy if exists "profiles self read" on public.profiles;
create policy "profiles self read" on public.profiles for select using (id=(select auth.uid()) or (select public.is_admin()));
drop policy if exists "profiles self update" on public.profiles;
create policy "profiles self update" on public.profiles for update using (id=(select auth.uid()) or (select public.is_admin())) with check (id=(select auth.uid()) or (select public.is_admin()));

drop policy if exists "charities public read" on public.charities;
create policy "charities public read" on public.charities for select using (active=true or (select public.is_admin()));
drop policy if exists "charities admin insert" on public.charities;
create policy "charities admin insert" on public.charities for insert with check ((select public.is_admin()));
drop policy if exists "charities admin update" on public.charities;
create policy "charities admin update" on public.charities for update using ((select public.is_admin())) with check ((select public.is_admin()));
drop policy if exists "charities admin delete" on public.charities;
create policy "charities admin delete" on public.charities for delete using ((select public.is_admin()));

drop policy if exists "subscriptions own read" on public.subscriptions;
create policy "subscriptions own read" on public.subscriptions for select using (user_id=(select auth.uid()) or (select public.is_admin()));
drop policy if exists "subscriptions admin insert" on public.subscriptions;
create policy "subscriptions admin insert" on public.subscriptions for insert with check ((select public.is_admin()));
drop policy if exists "subscriptions admin update" on public.subscriptions;
create policy "subscriptions admin update" on public.subscriptions for update using ((select public.is_admin())) with check ((select public.is_admin()));
drop policy if exists "subscriptions admin delete" on public.subscriptions;
create policy "subscriptions admin delete" on public.subscriptions for delete using ((select public.is_admin()));

drop policy if exists "preferences own read" on public.user_preferences;
create policy "preferences own read" on public.user_preferences for select using (user_id=(select auth.uid()) or (select public.is_admin()));
drop policy if exists "preferences own insert" on public.user_preferences;
create policy "preferences own insert" on public.user_preferences for insert with check (user_id=(select auth.uid()) or (select public.is_admin()));
drop policy if exists "preferences own update" on public.user_preferences;
create policy "preferences own update" on public.user_preferences for update using (user_id=(select auth.uid()) or (select public.is_admin())) with check (user_id=(select auth.uid()) or (select public.is_admin()));

drop policy if exists "scores own read" on public.golf_scores;
create policy "scores own read" on public.golf_scores for select using (user_id=(select auth.uid()) or (select public.is_admin()));
drop policy if exists "scores own insert" on public.golf_scores;
create policy "scores own insert" on public.golf_scores for insert with check (user_id=(select auth.uid()) or (select public.is_admin()));
drop policy if exists "scores own update" on public.golf_scores;
create policy "scores own update" on public.golf_scores for update using (user_id=(select auth.uid()) or (select public.is_admin())) with check (user_id=(select auth.uid()) or (select public.is_admin()));
drop policy if exists "scores own delete" on public.golf_scores;
create policy "scores own delete" on public.golf_scores for delete using (user_id=(select auth.uid()) or (select public.is_admin()));

drop policy if exists "draws public read published" on public.draws;
create policy "draws public read published" on public.draws for select using (status='published' or (select public.is_admin()));
drop policy if exists "draws admin insert" on public.draws;
create policy "draws admin insert" on public.draws for insert with check ((select public.is_admin()));
drop policy if exists "draws admin update" on public.draws;
create policy "draws admin update" on public.draws for update using ((select public.is_admin())) with check ((select public.is_admin()));
drop policy if exists "draws admin delete" on public.draws;
create policy "draws admin delete" on public.draws for delete using ((select public.is_admin()));

drop policy if exists "draw results own read" on public.draw_results;
create policy "draw results own read" on public.draw_results for select using (user_id=(select auth.uid()) or (select public.is_admin()));
drop policy if exists "draw results admin insert" on public.draw_results;
create policy "draw results admin insert" on public.draw_results for insert with check ((select public.is_admin()));
drop policy if exists "draw results admin update" on public.draw_results;
create policy "draw results admin update" on public.draw_results for update using ((select public.is_admin())) with check ((select public.is_admin()));
drop policy if exists "draw results admin delete" on public.draw_results;
create policy "draw results admin delete" on public.draw_results for delete using ((select public.is_admin()));

drop policy if exists "audit own insert" on public.audit_logs;
create policy "audit own insert" on public.audit_logs for insert with check (actor_id=(select auth.uid()) or (select public.is_admin()));
drop policy if exists "audit admin read" on public.audit_logs;
create policy "audit admin read" on public.audit_logs for select using ((select public.is_admin()));

drop policy if exists "winner proofs own upload" on storage.objects;
create policy "winner proofs own upload" on storage.objects for insert to authenticated with check (bucket_id='winner-proofs' and (storage.foldername(name))[1]=(select auth.uid())::text);
drop policy if exists "winner proofs own read" on storage.objects;
create policy "winner proofs own read" on storage.objects for select to authenticated using (bucket_id='winner-proofs' and ((storage.foldername(name))[1]=(select auth.uid())::text or (select public.is_admin())));
drop policy if exists "winner proofs admin delete" on storage.objects;
create policy "winner proofs admin delete" on storage.objects for delete to authenticated using (bucket_id='winner-proofs' and (select public.is_admin()));
