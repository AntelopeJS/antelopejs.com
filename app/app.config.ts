export default defineAppConfig({
  ui: {
    colors: {
      primary: "antelope",
      neutral: "slate",
    },
  },
  seo: {
    siteName: "Antelope JS",
  },
  header: {
    title: "",
    to: "/",
    logo: {
      alt: "Antelope",
      light: "/images/light/logo.svg",
      dark: "/images/dark/logo.svg",
    },
    search: true,
    colorMode: true,
    links: [
      {
        icon: "i-simple-icons-github",
        to: "https://github.com/AntelopeJS",
        target: "_blank",
        "aria-label": "GitHub",
      },
    ],
  },
  footer: {
    credits: `© ${new Date().getFullYear()} antelope srl. all rights reserved`,
    colorMode: true,
    links: [
      {
        icon: "i-simple-icons-discord",
        to: "https://discord.gg/yS53x6FXQj",
        target: "_blank",
        label: "Discord",
      },
      {
        icon: "i-simple-icons-github",
        to: "https://github.com/AntelopeJS",
        target: "_blank",
        label: "GitHub",
      },
    ],
    addresses: [
      {
        name: "Antelope S.R.L.",
        street: "Rue de Loncin 234",
        city: "4460, Grâce-Hollogne, Belgium",
        vat: "BE 1003.929.214",
      },
    ],
  },
  toc: {
    title: "Table of Contents",
    bottom: {
      title: "Community",
      edit: "https://github.com/AntelopeJS/antelopejs.com/tree/main/content",
      links: [
        {
          icon: "i-lucide-star",
          label: "Star on GitHub",
          to: "https://github.com/AntelopeJS/antelopejs",
          target: "_blank",
        },
      ],
    },
  },
});
