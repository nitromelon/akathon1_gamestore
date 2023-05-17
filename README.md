# Akathon contest: Game e-commerce website "Kirito" - frontend part

The objective of our project is to develop a comprehensive and user-friendly website that serves as a platform for gamers to purchase games. We have focused on creating an intuitive and interactive website design that allows gamers to easily navigate through the platform and make their desired game purchases. Our specialty lies in the unique homepage design, which utilizes a window-based system where each new page opens in a separate window, setting it apart from other conventional websites. Additionally, we have incorporated the use of a nonSQL database technology, which provides nearly real-time functionality and scalability.

## Authors

- [Nguyen Dang Duc Anh](https://github.com/nitromelon)
- [Nguyen Cuong Nhat](https://github.com/nhat120904)
- Nghiem Tuan Linh
- Vuong Khang Minh
- Phan Huy Quang

## Installation

We use pnpm but you can use any other package manager if you want. We are not responsible for problems caused by other package managers

```bash
  git clone https://github.com/nitromelon/akathon1_gamestore.git
  cd akathon1_gamestore
  pnpm install
```

## Run

- Dev version

```bash
  pnpm dev
```

- Build

```bash
  pnpm build && pnpm preview
```

- Production version

```bash
  pnpm build
```

Edit the index js file in the build folder: Go to the bottom, change 0.0.0.0 to localhost, and 3000 to 5173
Purpose: the backend is configured to accept only external cors localhost:5173

```bash
  node build
```

## Tech Stack

**Client:** Svelte, Typescript, SCSS.

### Used library

**Client:** Dicebear - <https://www.dicebear.com/>
