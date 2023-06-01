namespace :north_by do
  desc "returns all tickets to unsold"
  task reset_all_tickets: :environment do
    Ticket.update_all(status: :unsold)
  end

  desc "sell out random shows"
  task sell_out_shows: :environment do
    ids = Concert.pluck(:id).sample(3)
    concerts = Concert.find(ids)
    concerts.each do |concert|
      p "Selling out #{concert.id}: #{concert.name}"
      concert.tickets.update_all(status: :purchased)
    end
  end
end
