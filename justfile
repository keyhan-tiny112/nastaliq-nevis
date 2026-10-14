pm := "npm"

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
rp *FLAGS="": b
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

[unix]
[doc("compress a site in the zip")]
z *FLAGS="": b
    zip -qr nastaliq-nevis.zip . -x 'node_modules/*' 'dist/*' {{FLAGS}}

[unix]
[doc("remove `node-modules` and `dist`")]
c *FLAGS="":
    rm -rf node_modules dist

[doc("format `justfile`")]
fmt:
    just --fmt

[windows]
[doc("remove `node-modules` and `dist`")]
c *FLAGS="":
    rmdir node_modules /S /q
    rmdir dist /S /q

[doc("show usage of recipe")]
u RECIPE:
    just --usage {{RECIPE}}
