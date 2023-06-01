import { Controller } from "@hotwired/stimulus"

export default class SoldOutDataController extends Controller {
  static targets = ["concert"]
  concertTargets: Array<HTMLElement>

  connect(): void {
    setInterval(() => this.updateData(), 1000 * 60)
  }

  async updateData(): Promise<void> {
    const response = await fetch("/sold_out_concerts")
    const jsonString = await response.text()
    const jsonObject = JSON.parse(jsonString)
    const soldOutConcertIds = jsonObject["sold_out_concert_ids"].map((id) =>
      id.toString()
    )
    this.concertTargets.forEach((concertElement: HTMLElement) => {
      concertElement.dataset.concertSoldOutValue =
        soldOutConcertIds.includes(concertElement.dataset.concertIdValue)
    })
  }
}
