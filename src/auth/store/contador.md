ejercicio: mantener un estado de un contador con zustand

//auth
import { create } from 'zustand'

type Store = {
count: number
inc: () => void;
dec: () => void;
incBy: (value : number) => void;
}

export const useCounterStore = create<Store>()((set) => ({
count: 1,
inc: () => set((state) => ({ count: state.count + 1 })),
dec: () => set((state) => ({ count: state.count - 1 })),
incBy: (value : number) => set((state) => ({ count: state.count + value })),
}))

//page

import { useCounterStore } from "@/auth/store/auth.store"
import { Button } from "@/components/ui/button"

export const ProductPage = () => {
const {inc, dec, incBy, count} = useCounterStore()
return (

<>
<h1 className=" text-3xl font-monserrat">Count: {count} </h1>
<Button onClick={inc}> + 1
</Button>

    <Button onClick={dec}>
      -1
    </Button>

    <Button onClick={() => incBy(5)}>
      +5
    </Button>

</>
)
}
