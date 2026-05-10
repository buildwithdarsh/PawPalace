/** Simulated delay utilities for realistic loading states */

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/** Standard page load delay: 800-1200ms */
export function pageLoadDelay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, randomBetween(800, 1200)))
}

/** Action delay (add to cart, submit form): 400-700ms */
export function actionDelay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, randomBetween(400, 700)))
}

/** Lazy component loading delay: 300-500ms */
export function lazyDelay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, randomBetween(300, 500)))
}

/** One deliberately slow load: 1800-2500ms */
export function slowDelay(): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(resolve, randomBetween(1800, 2500))
  )
}

/** Quick feedback delay: 150-300ms */
export function quickDelay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, randomBetween(150, 300)))
}
