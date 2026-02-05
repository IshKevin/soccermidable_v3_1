# SoccerMidable.ca — Website v3.1

Includes:
- Next.js 14 website (FR/EN auto-detect)
- WhatsApp floating chat (scroll-based)
- Video hero on homepage
- CMS Admin (/admin): Programs + Leads + Settings + Upload API
- Backend API: /api/lead + /api/upload
- Widget: /public/widget/soccermidable.js

## 1) Setup
```bash
npm install
cp .env.example .env
# Generate admin password hash:
node -e "const b=require('bcryptjs'); console.log(b.hashSync('ChangeMe123!',10));"
# Put the hash into ADMIN_PASSWORD_HASH, set JWT_SECRET
```

## 2) Database (PostgreSQL)
```bash
npm run db:generate
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

Admin: http://localhost:3000/admin

## 3) Uploads
Uploads are stored in /public/uploads via POST /api/upload

## 4) Replace assets
- /public/video/hero.mp4  (replace with your real video)
- /public/images/*         (replace with real visuals)

## 5) Widget
Embed:
```html
<script src="https://soccermidable.ca/widget/soccermidable.js" data-locale="fr"></script>
```
