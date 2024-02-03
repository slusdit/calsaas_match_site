
import TeacherListGrid from "@/app/components/teacherSearch/TeacherListGrid"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Teacher } from "@prisma/client"
import { TeacherCardType } from "../cards/TeacherCard"

export interface TabContent {
  title: string,
  tabContent: React.ReactNode
}


export default function TeacherTabs({tabs = [{title:"Tabs Test",tabContent:<ul><li>Tab1</li><li>Tab Content</li></ul>}], teachers}:{tabs:TabContent[], teachers:TeacherCardType[]}) {
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
