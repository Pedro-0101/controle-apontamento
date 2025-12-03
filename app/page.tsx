import Link from "next/link";
import { Button } from "@/components/ui/button";


export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Hello Next.js!</h1>

      <Button variant="outline">Button</Button>
      <Button variant="secondary">Button</Button>
      <Button variant="ghost">Button</Button>
      <Button variant="link"><Link href={"/auth"}>Login</Link></Button>
    </div>
  )
}