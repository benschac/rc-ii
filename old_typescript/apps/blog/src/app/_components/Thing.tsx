'use client'
import {
  Spacer,
  Text,
  XStack,
  YStack,
  H3,
  View,
  Theme,
  type ThemeName,
} from 'tamagui'
import { SwitchThemeButton } from './SwitchThemeButton'
import { Link } from './Link'
import Script from 'next/script'
import React from 'react'

const Header = () => {
  const [headerHover, setHeaderHover] = React.useState(false)
  const randomNumber0to4 = () => Math.floor(Math.random() * 5)
  const altThemeNames = [
    'blue_alt1',
    'yellow_alt2',
    'green_alt1',
    'purple_alt2',
    'red_alt1',
  ] as ThemeName[]
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const orderOfThemes = React.useMemo(() => {
    const themes = [...altThemeNames]
    const theme = themes.splice(randomNumber0to4(), 1)
    return [...theme, ...themes]
  }, [])

  return (
    <YStack tag="header">
      <XStack
        key="header"
        animation="slow"
        enterStyle={{ x: -5, o: 0 }}
        exitStyle={{ x: -5, o: 0 }}
        columnGap="$4"
        ai="center"
        tag="nav"
        p="$6"
        pos="relative"
      >
        <View
          pos="relative"
          ai="center"
          onMouseEnter={() => setHeaderHover(true)}
          onMouseLeave={() => setHeaderHover(false)}
        >
          <Theme name={orderOfThemes[4]}>
            <H3
              y={headerHover ? -4 : 0}
              x={headerHover ? 4 : 0}
              pos="absolute"
              color="$color"
              animation="slow"
            >
              bensch.ac
            </H3>
          </Theme>
          <Theme name={orderOfThemes[3]}>
            <H3
              y={headerHover ? -4 : 0}
              x={headerHover ? 4 : 0}
              color="$color"
              animation="slow"
            >
              bensch.ac
            </H3>
          </Theme>
          <Theme name={orderOfThemes[2]}>
            <H3 y={0} x={0} color="$color" animation="slow" pos="absolute">
              bensch.ac
            </H3>
          </Theme>
          <Theme name={orderOfThemes[1]}>
            <H3
              y={headerHover ? -2 : 0}
              x={headerHover ? 2 : 0}
              color="$color"
              animation="slow"
              pos="absolute"
            >
              bensch.ac
            </H3>
          </Theme>
          <Theme name={orderOfThemes[0]}>
            <H3
              y={headerHover ? -4 : 0}
              x={headerHover ? 4 : 0}
              animation="slow"
              pos="absolute"
              color="$color"
            >
              bensch.ac
            </H3>
          </Theme>
          <H3
            y={headerHover ? -6 : 0}
            x={headerHover ? 6 : 0}
            animation="slow"
            pos="absolute"
            color="$color"
          >
            bensch.ac
          </H3>
        </View>
        <Spacer flex />
        <Link href="/about">about</Link>
        <Link href="/blog">blog</Link>
        <Link href="/uses">uses</Link>
        <SwitchThemeButton />
      </XStack>
    </YStack>
  )
}

const Footer = () => {
  return (
    <Theme>
      <YStack
        bg="$accentBackground"
        pos="absolute"
        ai="center"
        px="$4"
        py="$4"
        bottom={0}
        left={0}
        right={0}
        tag="footer"
      >
        <Script
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
          async
          defer
          src="https://www.recurse-scout.com/loader.js?t=52b00143745a218ef86c10cc5dc24f55"
        />
        <XStack f={1} ai="center">
          <Text fow="100" fos="$3" textAlign="center">
            © Benjamin {new Date().getFullYear()}
          </Text>
        </XStack>
      </YStack>
    </Theme>
  )
}

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <YStack f={1} px="$4">
      <Header />
      {children}
      <Footer />
    </YStack>
  )
}
