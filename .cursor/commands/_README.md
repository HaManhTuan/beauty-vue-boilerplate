# Cursor slash commands — hướng dẫn nhanh

## Dành cho ai?

| Đối tượng | Mục đích |
|-----------|----------|
| **Developer (chính)** | Chọn đúng lệnh `/…` trong Cursor theo giai đoạn việc (spec → FE spec → checklist → code). |
| **AI / Agent (phụ)** | Định tuyến nhanh: user mơ hồ thì đối chiếu bảng dưới để đề xuất hoặc chạy đúng command; nội dung chi tiết vẫn nằm trong từng file `*.md` tương ứng. |

File này **không** thay cho `AGENTS.md` hay nội dung trong từng command — chỉ là mục lục ngắn.

---

## Luồng điển hình (feature mới)

1. **`/specs`** — Từ Figma / tài liệu / mô tả → tạo `docs/specs/NNN-…/general.md` (master spec). **Không** đọc code app.
2. **`/specs.fe`** — Từ `general.md` → tạo `fe.md` (spec triển khai FE) theo template.
3. **`/specs.fe-checklist`** — Từ `fe.md` → tạo checklist dưới `docs/specs/NNN-…/checklists/fe/**`.
4. **`/specs.implement`** — Từ `fe.md` + thư mục checklist → implement code và tick checklist.

---

## Bảng “khi nào dùng lệnh nào”

| Lệnh | Dùng khi | Đầu vào tối thiểu |
|------|----------|-------------------|
| **`/specs`** | Bắt đầu feature: cần bản **general** (BA / system). | Figma **hoặc** link doc **hoặc** mô tả rõ scope. |
| **`/specs-fix`** | Sửa / bổ sung **master spec** đã có. | Đường dẫn `general.md` + mô tả thay đổi. |
| **`/specs.fe`** | Tách phần **frontend** từ master spec. | Đường dẫn `general.md`. |
| **`/specs.fe-fix`** | Sửa **`fe.md`** (scope, màn hình, API FE, v.v.). | Đường dẫn `fe.md` + mô tả thay đổi. |
| **`/specs.fe-checklist`** | Sinh **checklist triển khai** từ FE spec. | Đường dẫn `fe.md`. |
| **`/specs.fe-checklist-fix`** | Checklist sai / lệch spec / thiếu bước. | Mô tả vấn đề; (tuỳ chọn) path file checklist. |
| **`/specs.implement`** | **Code** theo checklist (sau khi đã có `fe.md` + checklist). | Path `fe.md` + path thư mục `checklists/fe`. |
| **`/spec-refactor`** | Thay đổi **cut across** nhiều spec/feature: cần **kế hoạch** refactor (không sửa code/spec trong bước này). | Mô tả thay đổi **hoặc** file mô tả. |

---

## Gợi ý nhanh

- Chỉ sửa tài liệu, chưa cần checklist: **`/specs-fix`** hoặc **`/specs.fe-fix`**.
- Đã có checklist nhưng chưa code: **`/specs.implement`**.
- Đổi rule / hành vi chung ảnh hưởng nhiều nơi: **`/spec-refactor`** → ra `docs/refactors/…/refactor-plan.md`, rồi mới implement theo plan.

Mỗi file lệnh trong thư mục này có mục **Agent skills & rules (MUST FOLLOW)** — khi chạy lệnh, agent vẫn phải tuân theo nội dung đó và **`AGENTS.md`**.
