# Setup guide

## Browser simulator

The active application is in web/. It requires Node.js 18 or newer and npm.

From the repository root, run:

    cd web
    npm install
    npm run dev

Open the local URL printed by Vite. The app runs in the browser and needs no radio, account, API key, or device connection.

To check the model and build the static site:

    npm test
    npm run build
    npm run lint

The production output is written to web/dist/.

## Vercel

The configured Vercel project root is web/. Its vercel.json uses the package build script and the dist output directory. Keep the Vercel dashboard Root Directory set to web so the build runs from the same package root.

A previous deployment log for commit 505cee1 used a command that tried to change into web/ from within the web project root. The root-specific Vercel configuration was added in commit 3d34006. The supplied failing log predates that commit; a successful deployment after the configuration change has not yet been recorded here.

## KiCad carrier

Open hardware/kicad/aether-carrier-r1/Aether-Carrier-R1.kicad_pro with KiCad 10 or later. The project-local Aether.pretty library contains custom socket footprints. Review the carrier README and verify exact mating components before treating the design as suitable for fabrication.

## Firmware

The ESP32 sketches are legacy files and have not been verified against carrier R1. Some contain transmitter-capable code. This setup guide does not provide flashing or RF operating instructions.
