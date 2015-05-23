class AddUserIdForeignKey < ActiveRecord::Migration
  def change

    remove_column :events, :user_id

    change_table :events do |t|
      t.belongs_to :user, index: true, foreign_key: true
    end

  end
end
