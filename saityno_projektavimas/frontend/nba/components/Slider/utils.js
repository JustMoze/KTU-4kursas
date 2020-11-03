import { theme } from "./stylesConfig";

export const generateSlides  = options => {
  const { id, content = "Slide", hasImage, useImageAsTag } = options;

  const colorList = [
    "cyan",
    "yellow",
    "fuschia",
    "teal",
    "pink",
    "blue",
    "lime",
    "violet"
  ];

  const colors = theme.colors;

  return colorList.map((colorName, idx) => ({
    id,
    content: `${content} #${idx + 1}`,
    fill: colors[colorName][4],
    useImageAsTag,
    ...(hasImage && {
      imageUrl: `https://picsum.photos/id/${Math.floor(Math.random() * 100) +
        idx}/320`
    })
  }));
};
