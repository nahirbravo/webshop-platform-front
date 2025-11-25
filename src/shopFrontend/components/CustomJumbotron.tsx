interface Props {
    title: string;
    subtitle?: string;
}


export const CustomJumbotron = ({title, subtitle}: Props) => {

  const defaulSubtitle = 'Ropa minimsalista y elegante inspirada en el diseño de tesla'

  return (
     <section className="py-10 px-4 lg:px-8 bg-muted/30">
        <div className="container mx-auto text-center">
          <h1 className=" font-monserrat text-2xl lg:text-5xl f tracking-tight mb-6">
            {title}
          </h1>
          <p className="font-monserrat  text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          {subtitle || defaulSubtitle}
          </p>
       
        </div>
      </section>

  )
}
