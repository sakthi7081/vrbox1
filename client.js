// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import { ReactInstance, Module, Surface } from "react-360-web";

function init(bundle, parent, options = {}) {
  r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    nativeModules: [new surfaceModule()],
    ...options,
  });

  introPanel = new Surface(
    450 /* width */,
    200 /* height */,
    Surface.SurfaceShape.Cylinder /* shape */
  );

  introRoot = r360.renderToSurface(
    r360.createRoot("vrbox", {
      /* initial props */
    }),
    introPanel
  );

  marketPanel = new Surface(50, 50, Surface.SurfaceShape.Flat);

  marketPanel.setAngle(0.53 /* yaw angle */, -0.08 /* pitch angle */);

  museumPanel = new Surface(50, 50, Surface.SurfaceShape.Flat);

  museumPanel.setAngle(1.35 /* yaw angle */, -0.3 /* pitch angle */);

  restaurantPanel = new Surface(50, 50, Surface.SurfaceShape.Flat);

  restaurantPanel.setAngle(-1.9 /* yaw angle */, -0.45 /* pitch angle */);

  shoppingPanel = new Surface(50, 50, Surface.SurfaceShape.Flat);

  shoppingPanel.setAngle(-2.1 /* yaw angle */, -0.53 /* pitch angle */);

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL("360_world.jpg"));
}

class surfaceModule extends Module {
  constructor() {
    super("surfaceModule");
  }

  resizeSurface(width, height, id) {
    if (id === "museum") {
      museumPanel.resize(width, height);
    } else if (id === "restaurant") {
      restaurantPanel.resize(width, height);
    } else if (id === "shopping") {
      shoppingPanel.resize(width, height);
    } else if (id === "market") {
      marketPanel.resize(width, height);
    }
  }

  start() {
    r360.renderToSurface(
      r360.createRoot("InfoPanel", {
        id: "market",
        text: "Browse our incredible market.",
      }),
      marketPanel
    );

    r360.renderToSurface(
      r360.createRoot("InfoPanel", {
        id: "shopping",
        text: "Shop until you drop!",
      }),
      shoppingPanel
    );

    r360.renderToSurface(
      r360.createRoot("InfoPanel", {
        id: "museum",
        text: "The Life of Pablo Picasso: Blue.",
      }),
      museumPanel
    );

    r360.renderToSurface(
      r360.createRoot("InfoPanel", {
        id: "restaurant",
        text: "Enjoy a delicious beer at our restaurants.",
      }),
      restaurantPanel
    );

    r360.detachRoot(introRoot);
  }
}

window.React360 = { init };
