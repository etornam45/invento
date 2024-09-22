import React, { useState } from 'react'
import { Input, ScrollView, TextArea, Button, Paragraph, View, ToggleGroup, XStack, Form, YStack } from 'tamagui'
import { Select, Adapt, Sheet } from 'tamagui'
import { Save, Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'

export default function ModalScreen() {
  const [selectedItem, setSelectedItem] = useState<"product" | "category">("product")

  return (
    <ScrollView>
      <View flex={1} alignItems="center" justifyContent="center">
        <YStack gap="$2" p="$4">
          <XStack>
            <ToggleGroup size="$2" onValueChange={(v) => setSelectedItem(v as "product" | "category")} type="single" defaultValue={selectedItem} p="$1" w="100%" disableDeactivation={true}>
              <ToggleGroup.Item width="50%" value="product">
                <Paragraph>Product</Paragraph>
              </ToggleGroup.Item>
              <ToggleGroup.Item width="50%" value="category"><Paragraph>Category</Paragraph></ToggleGroup.Item>
            </ToggleGroup>
          </XStack>
          {selectedItem === "product" ? (
            <Form>
              <YStack gap='$3' pb="$5">
                <XStack><Input flex={1} size="$4" placeholder='Product Name' /></XStack>
                <XStack><TextArea flex={1} size="$4" placeholder='Product Description' /></XStack>
                <XStack gap="$4">
                  <Input inputMode='numeric' flex={1} size="$4" placeholder='Stock Quantity' />
                  <Input inputMode='decimal' flex={1} size="$4" placeholder='Unit Price' />
                </XStack>
                <XStack>
                  <Select defaultValue="">
                    <Select.Trigger width="100%" iconAfter={ChevronDown}>
                      <Select.Value placeholder="Select Category" />
                    </Select.Trigger>

                    <Adapt when="sm" platform="touch">
                      <Sheet modal dismissOnSnapToBottom zIndex={20000000}>
                        <Sheet.Frame>
                          <Sheet.ScrollView>
                            <Adapt.Contents />
                          </Sheet.ScrollView>
                        </Sheet.Frame>
                        <Sheet.Overlay />
                      </Sheet>
                    </Adapt>

                    <Select.Content zIndex={200000}>
                      <Select.ScrollUpButton alignItems="center" justifyContent="center" position="relative" width="100%" height="$3">
                        <YStack zIndex={10}>
                          <ChevronUp size={20} />
                        </YStack>
                      </Select.ScrollUpButton>

                      <Select.Viewport minWidth={200}>
                        <Select.Group>
                          <Select.Label>Categories</Select.Label>
                          {CATEGORY_OPTIONS.map((option, i) => (
                            <Select.Item index={i} key={option.value} value={option.value}>
                              <Select.ItemText>{option.label}</Select.ItemText>
                              <Select.ItemIndicator marginLeft="auto">
                                <Check size={16} />
                              </Select.ItemIndicator>
                            </Select.Item>
                          ))}
                        </Select.Group>
                      </Select.Viewport>

                      <Select.ScrollDownButton alignItems="center" justifyContent="center" position="relative" width="100%" height="$3">
                        <YStack zIndex={10}>
                          <ChevronDown size={20} />
                        </YStack>
                      </Select.ScrollDownButton>
                    </Select.Content>
                  </Select>
                </XStack>
              </YStack>
              <Form.Trigger asChild>
                <Button theme="active" icon={Save}>
                  Save
                </Button>
              </Form.Trigger>
            </Form>
          ) : (
            <Form>
              <YStack gap='$3' pb="$5">
                <XStack><Input flex={1} size="$4" placeholder='Category Name' /></XStack>
                <XStack><TextArea flex={1} size="$4" placeholder='Category Description' /></XStack>
              </YStack>
              <Form.Trigger asChild>
                <Button theme="active" icon={Save}>
                  Save
                </Button>
              </Form.Trigger>
            </Form>
          )}
        </YStack>
      </View>
    </ScrollView>
  )
}

const CATEGORY_OPTIONS = [
  { value: 'business', label: 'Business & Economics' },
  { value: 'technology', label: 'Technology & Engineering' },
  { value: 'science', label: 'Science & Nature' },
  { value: 'fiction', label: 'Fiction & Literature' },
  { value: 'history', label: 'History & Philosophy' },
  { value: 'health', label: 'Health & Wellness' },
  { value: 'art', label: 'Art & Design' },
  { value: 'education', label: 'Education & Learning' },
  { value: 'cooking', label: 'Cooking & Nutrition' },
  { value: 'travel', label: 'Travel & Adventure' },
  { value: 'sports', label: 'Sports & Fitness' },
  { value: 'games', label: 'Games & Entertainment' },
  { value: 'music', label: 'Music & Performance' },
  { value: 'religion', label: 'Religion & Spirituality' },
  { value: 'self-help', label: 'Self-Help & Personal Growth' },
  { value: 'family', label: 'Family & Relationships' },
  { value: 'lifestyle', label: 'Lifestyle & Fashion' },
  { value: 'nature', label: 'Nature & Environment' },
  { value: 'politics', label: 'Politics & Society' },
  { value: 'law', label: 'Law & Justice' },
  { value: 'economics', label: 'Economics & Finance' },
  { value: 'marketing', label: 'Marketing & Advertising' },
  { value: 'management', label: 'Management & Leadership' },
  { value: 'communication', label: 'Communication & Media' },
  { value: 'psychology', label: 'Psychology & Behavior' },
  { value: 'philosophy', label: 'Philosophy & Ethics' },
  { value: 'religion', label: 'Religion & Spirituality' },
  { value: 'spirituality', label: 'Spirituality & Mysticism' },
  { value: 'history', label: 'History & Civilization' },
  { value: 'geography', label: 'Geography & World Cultures' },
  { value: 'anthropology', label: 'Anthropology & Archaeology' },
]