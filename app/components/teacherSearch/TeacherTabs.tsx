import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { TeacherCardType } from "@/lib/types"

export interface TabContent {
  title: string,
  tabContent: React.ReactNode
}

const dummyData:TabContent[] = [
  {
    title:"Tabs Test",
    tabContent:<ul><li>Tab1</li><li>Tab Content</li></ul>
  },
  {
    title:"Tabs Test The Second",
    tabContent:<ul><li>Tab2</li><li>Tab Content Yet again</li></ul>
  },
]

export default function TeacherTabs({tabs}:{tabs?:TabContent[]}) {
  if (!tabs){
    const tabs = dummyData
  }
  return (
    <Tabs defaultValue={tabs[0].title} >
      <TabsList className="
      flex 
      bg-background
      ">
        {tabs.map((tab, key) => (
          <TabsTrigger key={key} value={tab.title}>{tab.title}</TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab,key) => (
        <TabsContent key={key} value={tab.title}>
          {tab.tabContent}
        </TabsContent>
      ))}
      
    </Tabs>
  )
}
