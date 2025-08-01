# SVG Animáció Készítő

Egy modern, webes SVG animáció készítő alkalmazás React és TypeScript technológiával. Az alkalmazás három fő funkcionalitást kínál SVG animációk létrehozásához.

## ✨ Funkciók

### 1. 🎨 SVG Feltöltés & Animáció
- SVG fájlok drag & drop feltöltése
- 6 előre definiált animáció típus:
  - **Forgatás**: Folyamatos forgatás a középpont körül
  - **Pulzálás**: Ritmikus méretváltozás
  - **Pattogás**: Rugalmas fel-le mozgás  
  - **Ragyogás**: Fény effekt változó intenzitással
  - **Csúszás**: Oldalirányú mozgás
  - **Nagyítás**: Be- és kizoomolás
- Élő animáció előnézet
- Animált SVG letöltése

### 2. 🤖 AI Animáció Generátor
- Természetes nyelvi leírás alapján SVG animáció készítése
- 4 animáció stílus közül választás:
  - **Sima**: Folyamatos, lágy animáció
  - **Rugalmas**: Pattogó, élénk mozgás
  - **Elegáns**: Kifinomult, lassú animáció
  - **Energikus**: Gyors, dinamikus mozgás
- Prompt javaslatok
- Animáció előzmények
- SVG kód másolás és letöltés

### 3. ⏱️ Timeline Editor
- Frame-by-frame animáció szerkesztés
- Többrétegű munkaterület
- Keyframe alapú animáció
- Tulajdonság interpoláció (pozíció, forgatás, skála, átlátszóság)
- Valós idejű előnézet
- FPS beállítások (24/30/60)
- SVG export funkció

## 🚀 Telepítés és Futtatás

### Előfeltételek
- Node.js (16+ verzió)
- npm vagy yarn

### Telepítés
1. Klónozd a repository-t vagy töltsd le a fájlokat
2. Navigálj a projekt könyvtárába
3. Telepítsd a függőségeket:

```bash
npm install
```

### Futtatás
```bash
npm run dev
```

Az alkalmazás elérhető lesz: `http://localhost:3000`

### Build készítése
```bash
npm run build
```

### Előnézet a build-ből
```bash
npm run preview
```

## 🛠️ Technológiai Stack

- **Frontend Framework**: React 18
- **Nyelv**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animációk**: Framer Motion + GSAP
- **Ikonok**: Lucide React
- **Routing**: React Router DOM
- **SVG Manipuláció**: Fabric.js

## 📁 Projekt Struktúra

```
svg animation tool/
├── public/                 # Statikus fájlok
├── src/
│   ├── components/        # Újrahasznosítható komponensek
│   │   └── Navbar.tsx    # Navigációs sáv
│   ├── pages/            # Oldalak
│   │   ├── Home.tsx      # Főoldal
│   │   ├── UploadAnimation.tsx    # SVG feltöltés
│   │   ├── AIAnimation.tsx        # AI generátor
│   │   └── TimelineEditor.tsx     # Timeline szerkesztő
│   ├── App.tsx           # Fő alkalmazás komponens
│   ├── main.tsx          # Entry point
│   └── index.css         # Globális stílusok
├── package.json          # Függőségek és scriptek
├── tailwind.config.js    # Tailwind konfiguráció
├── tsconfig.json         # TypeScript konfiguráció
└── vite.config.ts        # Vite konfiguráció
```

## 🎯 Használat

### SVG Feltöltés
1. Menj a "SVG Feltöltés" oldalra
2. Húzd be az SVG fájlt vagy kattints a tallózáshoz
3. Válassz egy animáció típust a jobb oldali panelből
4. Alkalmazd az animációt és töltsd le

### AI Animáció
1. Menj az "AI Animáció" oldalra
2. Írd le, milyen animációt szeretnél (pl. "Forgó színes kör pulzáló háttérrel")
3. Válassz animáció stílust
4. Kattints a "Generálás" gombra
5. Töltsd le vagy másold a kódot

### Timeline Editor
1. Menj a "Timeline Editor" oldalra
2. Adj hozzá új rétegeket vagy módosítsd a meglévőket
3. Helyezz keyframe-eket az idővonalon
4. Állítsd be a tulajdonságokat minden keyframe-nél
5. Használd a lejátszás vezérlőket az előnézethez
6. Exportáld az animációt

## 🔧 Testreszabás

### Új Animáció Típusok Hozzáadása
Szerkeszd a `src/pages/UploadAnimation.tsx` fájlt és bővítsd az `animationTypes` tömböt.

### AI Prompts Testreszabása
Módosítsd a `promptSuggestions` tömböt a `src/pages/AIAnimation.tsx` fájlban.

### Stílusok Módosítása
A `tailwind.config.js` fájlban állíthatod be az egyedi színeket és stílusokat.

## 🤝 Közreműködés

1. Fork-old a projektet
2. Hozz létre egy feature branch-et (`git checkout -b feature/amazing-feature`)
3. Commit-old a változtatásokat (`git commit -m 'Add amazing feature'`)
4. Push-old a branch-et (`git push origin feature/amazing-feature`)
5. Nyiss egy Pull Request-et

## 📄 Licenc

Ez a projekt MIT licenc alatt áll. Lásd a `LICENSE` fájlt a részletekért.

## 🎉 Fejlesztési Tervek

- [ ] Valós AI integráció (OpenAI DALL-E, Midjourney)
- [ ] Több SVG export formátum (CSS, JavaScript animáció)
- [ ] Közösségi animáció galéria
- [ ] Collaborative editing
- [ ] Mobile responsive timeline editor
- [ ] Animáció template-ek
- [ ] Bulk SVG processing

## 📞 Támogatás

Ha problémád van vagy kérdésed van, nyiss egy issue-t a GitHub repository-ban.

---

**Készítette**: SVG Animáció Készítő Csapat
**Verzió**: 1.0.0
**Utolsó frissítés**: 2024 