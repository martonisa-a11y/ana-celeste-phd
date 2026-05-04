# Site — Ana Celeste PhD
**Stack:** HTML5 · CSS3 · Vanilla JS (sem frameworks)  
**Hospedagem:** GitHub Pages — deploy automático no push para `main`  
**URL:** https://martonisa-a11y.github.io/ana-celeste-phd/  
**Repositório:** https://github.com/martonisa-a11y/ana-celeste-phd

---

## Estrutura de arquivos

```
website/
├── index.html      ← homepage completa (single-page)
├── styles.css      ← todo o CSS (design tokens + componentes)
├── main.js         ← JS: nav, filtro blog, animações, contadores
└── assets/
    ├── logo.png    ← ⚠️ temporário — substituir por /brand/logo_oficial.png
    ├── hero.png    ← foto seção hero
    ├── profile.png ← foto seção sobre
    └── clinic.png  ← foto card blog
```

---

## Como atualizar e publicar

```bash
# 1. Editar os arquivos em /website/
# 2. Na pasta /website/:
git add -A
git commit -m "descrição da mudança"
git push
# GitHub Pages atualiza automaticamente em ~1 minuto
```

---

## Seções do index.html (em ordem)

| ID | Seção | Notas |
|---|---|---|
| `#inicio` | Hero | Título, lead, CTAs, credenciais, foto |
| `#profissionais` | Para Médicos (B2B) | Critérios de encaminhamento, canal direto — prioridade estratégica |
| `#especialidades` | Especialidades | 5 cards: LBI, Mucosite, Xerostomia, Paliativos, Domiciliar |
| `#sobre` | Sobre a Doutora | Narrativa + credenciais + citação |
| `#publicacoes` | Publicações | 4 artigos selecionados + links ORCID/Lattes |
| `#blog` | Blog | Cards com filtro por categoria (JS) |
| `#contato` | Contato | WhatsApp, e-mail, localização, formulário |

---

## Design System (CSS)

Todas as variáveis estão no `:root` no início de `styles.css`.

### Paleta — Leveza Clínica
```css
--c-sage:       #4A6B5D   /* principal — verde-sálvia */
--c-sage-light: #7BA492   /* secundário */
--c-warm:       #C4A882   /* acento quente */
--c-bg:         #F7F4EE   /* fundo geral */
--c-surface:    #EDE8DF   /* fundo alternado (cards, seções) */
--c-text:       #222B26   /* texto principal */
```

### Tipografia
```css
--f-display: 'Cormorant Garamond', Georgia, serif    /* títulos */
--f-body:    'Instrument Sans', system-ui, sans-serif /* corpo */
--f-mono:    'DM Mono', 'Courier New', monospace      /* labels, dados */
```

### Classes utilitárias principais
| Classe | Uso |
|---|---|
| `.reveal` | Elemento anima ao entrar na tela (IntersectionObserver) |
| `.reveal-delay-1/2/3` | Atraso de entrada (0.1s / 0.2s / 0.3s) |
| `.btn--primary` | Botão sólido verde-sálvia |
| `.btn--outline` | Botão com borda |
| `.btn--full` | Botão largura 100% |
| `.tag` | Chip/label pequeno verde |
| `.tag--warm` | Chip/label quente (bege) |
| `.link` | Link com seta animada |
| `.font-mono` | Força tipografia DM Mono |
| `.container` | Wrapper centralizado max-width 1200px |

---

## Animações (main.js + styles.css)

| Animação | Onde | Como |
|---|---|---|
| Scroll reveal | Todos os `.reveal` | IntersectionObserver |
| Float | `.hero__image-card` | CSS keyframe `float-card` |
| Pulse ring | `.whatsapp-fab::before` | CSS keyframe `pulse-ring` |
| Counter | `.sobre__stat-val` | JS `animateCounter()` |
| Parallax | `.hero__image` (desktop) | JS scroll listener |
| Magnético | `.btn--primary` | JS mousemove |
| Reduced motion | Todo o site | `@media (prefers-reduced-motion: reduce)` |

---

## Placeholders pendentes — substituir antes de lançar

```
index.html linha ~93:   href="https://wa.me/55XXXXXXXXXXX"
index.html linha ~203:  href="https://wa.me/55XXXXXXXXXXX?text=..."
index.html linha ~489:  href="https://wa.me/55XXXXXXXXXXX"
index.html linha ~589:  href="https://wa.me/55XXXXXXXXXXX"  ← FAB
index.html linha ~512:  contato@anacelestephd.com.br        ← confirmar e-mail
index.html linha ~581:  CRO-CE XXXXX                        ← número do CRO real
assets/logo.png         ← substituir por /brand/logo_oficial.png
```

---

## Próximas páginas a criar

```
website/
├── blog/
│   ├── index.html                            ← listagem completa do blog
│   ├── mucosite-o-que-ninguem-te-contou.html
│   ├── cuidados-boca-quimioterapia.html
│   ├── quando-encaminhar.html
│   └── laserterapia-evidencias.html
└── especialidades/
    ├── laserterapia.html
    ├── mucosite.html
    ├── xerostomia.html
    └── cuidados-paliativos.html
```

---

## Formulário de contato — integração sugerida

O formulário em `#contato` atualmente só faz `preventDefault()`. Para funcionar de verdade:

**Opção A — Formspree (mais simples, gratuito):**
```html
<form action="https://formspree.io/f/SEU_ID" method="POST">
```

**Opção B — EmailJS (sem backend):**
```js
emailjs.sendForm('service_id', 'template_id', form);
```

**Opção C — Backend próprio** (se tiver servidor Hostinger configurado).

---

## SEO local — palavras-chave alvo

```
"dentista oncológica Fortaleza"
"odontologia oncológica Fortaleza"
"mucosite oral tratamento Fortaleza"
"laserterapia mucosite"
"dentista para pacientes com câncer Fortaleza"
```

O Schema.org `Dentist` já está implementado no `<head>` com sameAs para ORCID e Lattes.

---

## Git — commits anteriores

```
d4a8201  Fix: imagem cortada no mobile
408eb29  UX: animações, negrito, correção imagem mobile
b546e28  Sobre: narrativa real + seção de publicações científicas
469c932  Site inicial — Ana Celeste PhD
```
