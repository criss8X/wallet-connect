Leerá el package.json y el components.json y establecera el componente e instalara las dependencias necesarias.
> pnpm wcs setup

Instalará el componente en la ubicación correcta teniendo en cuenta components.json pero sin instalar dependencias o necesarias.
Util cuando el usuario desea simplicidad.
> pnpm wcs setup --noDeps

Instalará el componente en la ubicación destinada, se omitirá la instalación de dependencias y la lectura del components.json.
> pnpm wcs setup -to path/to