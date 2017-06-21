require 'sinatra'
require 'sinatra/reloader' if development?
require 'active_record'

ActiveRecord::Base.establish_connection(
	"adapter" => "sqlite3",
	"database" => "./bla.db"
)

# before do
#   logger.info "page is loading..."
# end

# after do
# 	logger.info "page displayed successfully"
# end

helpers do
	include Rack::Utils
	alias_method :h, :escape_html
end

class Beer < ActiveRecord::Base
end

get '/' do
	@beers = Beer.order("id desc").all
	erb :index
end

post '/new' do
	Beer.create({:name => params[:name], :alc => params[:alc], :style => params[:style], :country => params[:country], :score => params[:score], :comment => params[:comment]})
	redirect '/'
end

post '/update' do
	beer = Beer.find(params[:id])
	beer.update({:name => params[:name], :alc => params[:alc], :style => params[:style], :country => params[:country], :score => params[:score], :comment => params[:comment]})
	redirect '/'
end

post '/delete' do
	Beer.find(params[:id]).destroy
end