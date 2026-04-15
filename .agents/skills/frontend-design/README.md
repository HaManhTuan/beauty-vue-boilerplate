# Skill `frontend-design` — Hướng dẫn sử dụng

Skill này giúp AI (và bạn) thiết kế **giao diện web có cá tính, chất lượng production**, tránh phong cách “AI generic” (font quen thuộc, gradient tím–trắng, layout một màu). Nội dung chi tiết và nguyên tắc thẩm mỹ nằm trong **`SKILL.md`** cùng thư mục.

---

## Skill dùng để làm gì?

- Định hướng **tone thiết kế** rõ ràng (tối giản / tối đa / editorial / retro-futuristic, …).
- Chọn **typography, màu, layout, chuyển động, nền** có chủ đích, không lặp lại mẫu sáo rỗng.
- Viết **code chạy được** (HTML/CSS/JS, Vue, React, …) phù hợp ngữ cảnh bạn mô tả.

**Không thay thế** design system của dự án — xem mục “Trong repo beauty-vue-boilerplate” bên dưới.

---

## Khi nào nên bật skill này?

| Tình huống | Gợi ý |
|------------|--------|
| Landing page, marketing, poster web, demo portfolio | Rất phù hợp — yêu cầu rõ **đối tượng**, **mood**, **tham chiếu** (nếu có). |
| Dashboard / admin / màn hình CRUD nội bộ | Dùng kết hợp: trước tiên **`docs/ui/`** + **`tailwind-design-system`** + **`shadcn-vue`**; skill này giúp **layout, nhịp, chi tiết** trong khung đã có. |
| “Làm đẹp” lại component có sẵn | Mô tả **giới hạn** (giữ API/props, chỉ đổi visual) để không phá kiến trúc. |
| Prototype nhanh ý tưởng UI | Phù hợp — nhớ ghi **Vue + Tailwind + shadcn** nếu làm trong repo này. |

---

## Cách nhắc AI (prompt) cho hiệu quả

1. **Bối cảnh**: Màn hình gì, ai dùng, mục tiêu (ví dụ: đăng ký, báo cáo, giới thiệu sản phẩm).
2. **Hướng thẩm mỹ**: Chọn 1–2 từ khóa mạnh (ví dụ: *tối giản Nhật*, *brutalist*, *luxury tối*, *playful*).
3. **Ràng buộc kỹ thuật**: Vue 3, Tailwind v4, dark mode, mobile-first, v.v.
5. **Gọi skill**: Ví dụ: *“Áp dụng skill frontend-design trong `.agents/skills/frontend-design` để làm layout hero trang X.”*

---

## Trong repo **beauty-vue-boilerplate**

Thứ tự khuyến nghị khi làm giao diện **trong dự án này** (khớp **`AGENTS.md`**):

1. **`docs/ui/`** (nếu có trong repo): `design-system.md` → `design-style.md`.
2. **`.cursorrules`** và **`.cursor/rules/`** (form, bảng, modal, tiền tệ, validation, …) — **không** vi phạm để “đẹp hơn”.
3. **Skill kỹ thuật UI**: `tailwind-design-system`, `tailwind-css-patterns`, `shadcn-vue`, `animate` (Animate.css đã import trong `main.ts`).
4. **`frontend-design`** — tăng chất lượng **thẩm mỹ & sáng tạo** trong khung trên: typography, màu, composition, motion (ưu tiên **CSS / Tailwind / Animate.css**, `prefers-reduced-motion`).

**Quy tắc ưu tiên khi xung đột:** xem **`AGENTS.md`** → `.cursorrules` và `.agents/rules/` **trước** skill; skill **frontend-design** không được phép làm sai quy tắc form/table/modal của dự án.

---

## Checklist ngắn trước khi giao code

- [ ] Đã đọc (hoặc chỉ định AI đọc) **`SKILL.md`** của skill này.
- [ ] Giao diện nội bộ: đã xem **`docs/ui/`** và vị trí component đúng **`component-handling`** / `structure.md`.
- [ ] Animation: có xét **`prefers-reduced-motion`** khi thêm hiệu ứng mạnh.
- [ ] Không hard-code text cần i18n nếu dự án đang dùng i18n (theo `.cursorrules`).

---

## Tài liệu trong thư mục

| File | Nội dung |
|------|----------|
| **`SKILL.md`** | Nguyên tắc design thinking, aesthetics, những thứ cần tránh |
| **`LICENSE.txt`** | Điều khoản license của skill |

---

## Tóm tắt một dòng

**Dùng `frontend-design` khi bạn muốn UI nhớ lâu, có ý đồ thiết kế rõ — luôn kết hợp với design system và rule của repo để vừa đẹp vừa đúng chuẩn sản phẩm.**
