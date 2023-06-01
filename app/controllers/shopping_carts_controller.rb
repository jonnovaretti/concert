#---
# Excerpted from "Modern Front-End Development for Rails, Second Edition",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit https://pragprog.com/titles/nrclient2 for more book information.
#---
class ShoppingCartsController < ApplicationController
  def create
    seat_number = params[:seatNumber]
    seat_range = seat_number...seat_number + params[:ticketsToBuyCount]
    tickets = Ticket.where(
      concert_id: params[:concertId],
      row: params[:row],
      number: seat_range
    ).all
    tickets.update(
      status: params[:status],
      user: params[status] == "held" ? current_user.id : nil
    )
    render(json: tickets.map(&:to_concert_h))
  end
end
