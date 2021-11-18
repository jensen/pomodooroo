create table sessions (
  id uuid default extensions.uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  title text not null 
);

create table events (
  id uuid default extensions.uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  type text not null,

  started bigint not null,
  paused bigint not null, 
  duration bigint not null,

  session_id uuid not null,
  constraint session_id foreign key(session_id) references sessions(id) on delete cascade
);
