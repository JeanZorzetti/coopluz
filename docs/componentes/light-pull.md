You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
```tsx
light-pull-theme-switcher.tsx
import { motion } from "motion/react";

export function LightPullThemeSwitcher() {
    const toggleDarkMode = () => {
        const root = document.documentElement;
        root.classList.toggle("dark");
    };

    return (
      <div className="relative py-16 p-6 overflow-hidden">
        <motion.div
          drag="y"
          dragDirectionLock
          onDragEnd={(event, info) => {
            if (info.offset.y > 0) {
              toggleDarkMode();
            }
          }}
          dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
          dragTransition={{ bounceStiffness: 500, bounceDamping: 15 }}
          dragElastic={0.075}
          whileDrag={{ cursor: "grabbing" }}
          className="relative bottom-0 w-8 h-8 rounded-full 
               bg-[radial-gradient(circle_at_center,_#facc15,_#fcd34d,_#fef9c3)] 
               dark:bg-[radial-gradient(circle_at_center,_#4b5563,_#1f2937,_#000)] 
               shadow-[0_0_20px_8px_rgba(250,204,21,0.5)] 
               dark:shadow-[0_0_20px_6px_rgba(31,41,55,0.7)]"
        >
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-0.5 h-[9999px] bg-neutral-200 dark:bg-neutral-700"></div>
        </motion.div>
      </div>
    );
}

demo.tsx
import { LightPullThemeSwitcher } from "@/components/ui/light-pull-theme-switcher"

export function Demo(){
    return(
        <div className="flex flex-col items-center">
            <LightPullThemeSwitcher/>
            <p className="text-sm text-neutral-500">Pull down to change theme</p>
        </div>
    )
}
```

Install NPM dependencies:
```bash
motion
```
