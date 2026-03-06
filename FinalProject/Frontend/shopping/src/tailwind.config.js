export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "rgb(16, 73, 189)",
        secondary: "rgb(28, 57, 135)",
        subSecondary: "rgb(15, 23, 42)",

        silverMember: "rgb(123, 138, 161)",
        goldMember: "rgb(237, 164, 23)",
        platinumMember: "rgb(117, 83, 239)",

        secondaryButton: "rgb(12, 46, 110)",
        paginationButton: "rgb(14, 47, 111)",
        primaryButton: "rgb(12, 75, 189)",

        titleColor: "rgb(33, 39, 52)",
        primaryFontColor: "rgb(21, 71, 192)",
        secondaryFontColor: "rgb(66, 94, 136)",
        subSecondaryFontColor: "rgb(66, 104, 199)",
      },

      fontSize: {
        title1: ["36px", { lineHeight: "44px", fontWeight: "700" }],
        title2: ["28px", { lineHeight: "36px", fontWeight: "600" }],
        subtitle: ["22px", { lineHeight: "30px", fontWeight: "600" }],
        body: ["16px", { lineHeight: "24px" }],
        small: ["14px", { lineHeight: "20px" }],
      },
    },
  },

  plugins: [],
};
