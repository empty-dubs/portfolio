export function phi (t: number, n: number): number {

  return 2 * Math.PI * t / n;

}

/// //////////////////////////Styling//////////////////////////////////////

export function colorNodes (n: number, type: string = '') {

  let color: number | null = null;
  let mod: number = n % 4;

  if (type === 'cool') {

    const colors: number[] = [
      0x5dff00,
      0x1000ff,
      0xff00e1,
      0x009990,
    ]

    color = colors[mod];

  } else if (type === 'hot') {

    const colors: number[] = [
      0xff0000,
      0xff7200,
      0xf2ff00,
      0xffffff,
    ]

    color = colors[mod];

  } else {
    const colors: number[] = [
      0xff0000,
      0xff7200,
      0xf2ff00,
      0x5dff00,
      0x1000ff,
      0xff00e1,
      0xffffff,
    ]

    mod = n % 7;

    color = colors[mod];

  }

  return color;

}
