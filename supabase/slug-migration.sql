-- Add readable, unique slugs to public content tables.
alter table public.blog_posts add column if not exists slug text;
alter table public.products add column if not exists slug text;
alter table public.jobs add column if not exists slug text;

create or replace function public.slugify(value text)
returns text
language sql
immutable
as $$
  select coalesce(nullif(
    regexp_replace(
      regexp_replace(lower(trim(value)), '[^[:alnum:]؀-ۿ]+', '-', 'g'),
      '(^-|-$)', '', 'g'
    ),
    ''
  ), 'item');
$$;

do $$
declare
  current_row record;
  base_slug text;
  candidate_slug text;
  suffix integer;
begin
  for current_row in select id, title from public.blog_posts order by id loop
    base_slug := public.slugify(current_row.title);
    candidate_slug := base_slug;
    suffix := 2;
    while exists (select 1 from public.blog_posts where slug = candidate_slug and id <> current_row.id) loop
      candidate_slug := base_slug || '-' || suffix;
      suffix := suffix + 1;
    end loop;
    update public.blog_posts set slug = candidate_slug where id = current_row.id;
  end loop;

  for current_row in select id, name from public.products order by id loop
    base_slug := public.slugify(current_row.name);
    candidate_slug := base_slug;
    suffix := 2;
    while exists (select 1 from public.products where slug = candidate_slug and id <> current_row.id) loop
      candidate_slug := base_slug || '-' || suffix;
      suffix := suffix + 1;
    end loop;
    update public.products set slug = candidate_slug where id = current_row.id;
  end loop;

  for current_row in select id, title from public.jobs order by id loop
    base_slug := public.slugify(current_row.title);
    candidate_slug := base_slug;
    suffix := 2;
    while exists (select 1 from public.jobs where slug = candidate_slug and id <> current_row.id) loop
      candidate_slug := base_slug || '-' || suffix;
      suffix := suffix + 1;
    end loop;
    update public.jobs set slug = candidate_slug where id = current_row.id;
  end loop;
end;
$$;

alter table public.blog_posts alter column slug set not null;
alter table public.products alter column slug set not null;
alter table public.jobs alter column slug set not null;

create unique index if not exists blog_posts_slug_key on public.blog_posts (slug);
create unique index if not exists products_slug_key on public.products (slug);
create unique index if not exists jobs_slug_key on public.jobs (slug);