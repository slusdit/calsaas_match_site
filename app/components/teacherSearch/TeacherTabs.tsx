import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Suspense } from "react"


export interface TabContent {
  title: string,
  tabContent: React.ReactNode
}

const dummyData: TabContent[] = [
  {
    title: "Tabs Test",
    tabContent: <ul><li>Tab1</li><li>Tab Content</li></ul>
  },
  {
    title: "Tabs Test The Second",
    tabContent: <ul><li>Tab2</li><li>Tab Content Yet again</li></ul>
  },
]

export default function TeacherTabs({ tabs }: { tabs?: TabContent[] }) {
  if (!tabs) {
    const tabs = dummyData
  }
  return (
    <Tabs defaultValue={tabs[0].title} >
      <div className="justify-center w-full">
        <TabsList className="
      w-56
      rounded-lg
      items-center
      mx-5

      gap-3
      p-3
      ">
          {tabs.map((tab, key) => (
            <TabsTrigger
              key={key}
              value={tab.title}
              className="
            w-full
            rounded
            border
            border-transparent
            bg-transparent
            p-2
            text-sm
            font-medium"
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab, key) => (
          <TabsContent key={key} value={tab.title} className="w-full">
            <Suspense fallback={<div>Loading...</div>}>
              {tab.tabContent}
            </Suspense>
          </TabsContent>
        ))}
      </div>

    </Tabs>
  )
}
