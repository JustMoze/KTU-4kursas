import Head from 'next/head'
import { Box } from "@react-yuki/ui";
import Slider from '../components/Slider/Carousel';
import { ThemeProvider } from "emotion-theming";
import { theme, globalStyles } from "../components/Slider/stylesConfig";
import { Global } from "@emotion/core";
import Navbar from '../components/navbar/Navbar'

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <>
      <Head>
        <title>NBA_fantasy</title>
        <link rel="icon" href="/nba_1.png" />
      </Head>
      <Navbar />
      <Global styles={globalStyles} />
      <Box>
        <Slider
          hasImage
          id="three-d-overflow-effect"
          params={{
            effect: "coverflow",
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: "auto",
            coverflowEffect: {
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true
            },
            pagination: {
              el: ".swiper-pagination"
            }
          }}
        />
      </Box>
      </>
    </ThemeProvider>
  )
}
