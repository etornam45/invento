import { ExternalLink } from '@tamagui/lucide-icons'
import { Anchor, Card, H2, Paragraph, ScrollView, XStack, YStack } from 'tamagui'
import { ToastControl } from 'app/CurrentToast'
import MetricsDisplay from 'components/MatricsDisplay'
import RevenueChart from 'components/RevenueChart'
import RecentSales from 'components/RecentSales'

export default function TabOneScreen() {
  return (
    <ScrollView>
      <YStack f={1} ai="center" gap="$4" px="$4" pt="$5">
        <MetricsDisplay />
        <RevenueChart />
        <RecentSales />
      </YStack>
      <Card padding="$4" space="$4" width="100%" backgroundColor="transparent">
      </Card>
    </ScrollView>
  )
}
