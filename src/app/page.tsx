import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className='flex p-2 flex-col'>
      <Input />
      <div className='p-5 flex items-center gap-4'>
        .<Button size={"lg"}>Primary</Button>
        <Button variant={"secondary"}>Secondary</Button>
        <Button variant={"destructive"}>Destructive</Button>
        <Button variant={"ghost"}>Ghost</Button>
        <Button variant={"muted"}>Muted</Button>
        <Button variant={"outline"}>Outline</Button>
        <Button variant={"tertiary"}>Tertiary</Button>
      </div>
    </div>
  );
}
