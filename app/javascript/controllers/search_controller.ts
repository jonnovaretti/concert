import { Controller } from "@hotwired/stimulus"
import "form-request-submit-polyfill"

export default class SearchController extends Controller {
  static targets = ["form", "input", "results"]
  formTarget: HTMLFormElement
  inputTarget: HTMLInputElement
  resultsTarget: HTMLElement

  resetOnOutsideClick(event: Event): void {
    if (!this.element.contains(event.target as HTMLElement)) {
      this.reset()
    }
  }

  reset(): void {
    this.resultsTarget.classList.add("hidden")
    this.resultsTarget.innerText = ""
    this.inputTarget.value = ""
  }

  basicSubmit(): void {
    if (this.inputTarget.value === "") {
      this.reset()
    } else {
      this.formTarget.requestSubmit()
    }
  }

  submit = this.debounce(this.basicSubmit.bind(this))

  debounce(functionToDebounce: Function, wait = 300) {
    let timeoutId = null

    return (...args: any[]) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        timeoutId = null
        functionToDebounce(...args)
      }, wait)
    }
  }
}
