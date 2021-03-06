class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string :name
      t.string :address
      t.float :latitude
      t.float :longitude
      t.belongs_to :story, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
