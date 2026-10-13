pm := "bun"

set shell := ["sh", "-cu"]

set windows-shell := ["powershell", "-NoLog", "-Command"]

set quiet

[private]
defualt:
    just --list

[doc("install package(s)")]
i PACKAGE="" *FLAGS="":
    {{pm}} install {{PACKAGE}} {{FLAGS}}

[doc("run a server (for development)")]
rd *FLAGS="":
    {{pm}} run dev {{FLAGS}}

[doc("run a server with custom flags")]
r *FLAGS="":
    {{pm}} run {{FLAGS}}

[doc("build and run a server")]
rb *FLAGS="":
    {{pm}} run build {{FLAGS}}

[doc("show a preview site")]
rp *FLAGS="":
    {{pm}} run preview {{FLAGS}}

[doc("build and run")]
b *FLAGS="":
    {{pm}} run build {{FLAGS}}

[doc("run a preview")]
p *FLAGS="":
    {{pm}} run preview {{FLAGS}}

[doc("run `vite build`")]
bv *FLAGS="":
    vite build {{FLAGS}}
