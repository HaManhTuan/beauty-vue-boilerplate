<div align="center">

[🇬🇧 English](./README.md) · **🇻🇳 Tiếng Việt**

# Beauty Vue Boilerplate

**Boilerplate admin Vue 3 hướng production** — khung dashboard, API có kiểu, tầng dữ liệu TanStack, và giao diện Tailwind + Reka UI.

<br />

[![Vue 3](https://img.shields.io/badge/Vue-3.5-42b883?style=for-the-badge&logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

<br />

[![pnpm](https://img.shields.io/badge/pnpm-package%20manager-f69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Pinia](https://img.shields.io/badge/Pinia-state-yellowgreen)](https://pinia.vuejs.org/)
[![TanStack Query](https://img.shields.io/badge/TanStack-Query%20%2B%20Form-ff4154)](https://tanstack.com/)

</div>

<br />

---

## Điểm nổi bật

| | |
|:---|:---|
| **UI** | Tailwind CSS, primitive **Reka UI**, icon lucide, hook sáng/tối |
| **Dữ liệu** | **TanStack Vue Query** & **Vue Form**, **Zod**, client **Supabase** (tuỳ chọn) |
| **HTTP** | **Axios** qua `apiClient` dùng chung (`src/plugins/httpClient.ts`) + `tokenManager` |
| **Cấu trúc** | Layout dashboard, sidebar, router guard, Pinia store |
| **DX** | ESLint 9, Prettier, `vue-tsc`, Vite 6, alias đường dẫn `@/` |

---

## Bắt đầu nhanh

```bash
# cài dependency
pnpm install

# sao chép file môi trường mẫu
cp .env.example .env

# chạy dev (mặc định http://localhost:5173)
pnpm dev
```

Sau đó mở URL mà Vite in ra trong terminal.

---

## Lệnh script

| Lệnh | Mô tả |
|------|--------|
| `pnpm dev` | Chạy Vite dev server, có HMR |
| `pnpm build` | Kiểm tra kiểu (`vue-tsc`) + build production |
| `pnpm preview` | Xem thử bản build production trên máy |
| `pnpm lint` | Chạy ESLint toàn project |
| `pnpm lint:fix` | ESLint kèm `--fix` |
| `pnpm format` | Prettier ghi file |
| `pnpm format:check` | Prettier chỉ kiểm tra, không ghi |

---

## Biến môi trường

Tạo file `.env` từ [`.env.example`](./.env.example):

| Biến | Mục đích |
|------|----------|
| `VITE_API_BASE_URL` | Gốc REST API (không có slash cuối). Để trống nếu chỉ dùng Supabase phía trình duyệt. |
| `VITE_SUPABASE_URL` | URL project Supabase (tuỳ chọn) |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key (tuỳ chọn) |

---

## Cấu trúc thư mục (repo)

```text
src/
├── apis/cores/          # Class API theo domain (kế thừa BaseApi)
├── apis/services/       # Hook TanStack Query (bổ sung theo domain)
├── components/
│   ├── molecules/       # Phần khung app (header, sidebar, …)
│   └── ui/              # Primitive kiểu Reka / shadcn
├── layouts/             # Ví dụ DashboardLayout
├── lib/                 # utils, helper Supabase, validators (mở rộng tại đây)
├── plugins/             # httpClient, apiService, tokenManager, queryClient
├── router/              # route, guard, cấu hình sidebar
├── stores/              # Pinia
├── style.css            # Tailwind + token toàn cục
└── views/               # Trang có route & màn hình feature
```

---

## Tài liệu

| Tài nguyên | Dùng để |
|------------|---------|
| [`AGENTS.md`](./AGENTS.md) | **Đọc đầu tiên** — thứ tự ưu tiên rule, mục lục skill, stack mặc định |
| [`docs/project-overview.md`](./docs/project-overview.md) | Stack, vai trò, kiến trúc — **đọc trước lệnh `/specs*`** |
| [`.cursorrules`](./.cursorrules) | CRUD, dialog, API, pnpm, kỳ vọng test của project |
| [`.agents/rules/`](./.agents/rules/) | Cấu trúc, đặt tên, model, tầng API |
| [`docs/templates/`](./docs/templates/) | Template spec, workflow FE, checklist, [thông điệp chung](./docs/templates/common_messages.md) |
| [`.cursor/commands/_README.md`](./.cursor/commands/_README.md) | Khi nào dùng từng lệnh Cursor `/specs…` |

---

## Quy ước công cụ

- Chỉ dùng **pnpm** (`pnpm add`, `pnpm add -D`).
- Thêm component kiểu shadcn-vue theo CLI / quy tắc trong `.cursorrules` (không copy nguyên khối primitive tay).
- Sau chỉnh sửa đáng kể, chạy **`pnpm lint`**; dùng **`pnpm lint:fix`** chỉ khi bạn **chủ định** áp dụng auto-fix.
- Giao feature khi **`pnpm build`** chạy xanh.

---

## Giấy phép

Mặc định **private / chưa cấp license** — thêm file `LICENSE` khi bạn công bố hoặc phân phối lại.

---

<div align="center">

<sub>Xây dựng với Vue 3 · TypeScript · Vite · Tailwind · TanStack · Pinia</sub>

</div>
