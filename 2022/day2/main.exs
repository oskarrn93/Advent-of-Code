defmodule Day2 do
  @rock "A"
  @paper "B"
  @scissors "C"

  def get_win_score(card1, card2) do
    cond do
      card2 == @rock and card1 == @scissors -> 6
      card2 == @paper and card1 == @rock -> 6
      card2 == @scissors and card1 == @paper -> 6
      card2 == card1 -> 3
      true -> 0
    end
  end

  def get_card_score(card) do
    case card do
      @rock -> 1
      @paper -> 2
      @scissors -> 3
    end
  end

  def get_score(card1, card2) do
    get_win_score(card1, card2) + get_card_score(card2)
  end

  def remap_card2(card) do
    case card do
      "X" -> @rock
      "Y" -> @paper
      "Z" -> @scissors
    end
  end

  def replace_card(card1, card2) do
    case card2 do
      @rock when card1 == @rock -> @scissors
      @rock when card1 == @paper -> @rock
      @rock when card1 == @scissors -> @paper
      @paper -> card1
      @scissors when card1 == @rock -> @paper
      @scissors when card1 == @paper -> @scissors
      @scissors when card1 == @scissors -> @rock
    end
  end

  def setup() do
    {:ok, input} = File.read("input.txt")

    input
    |> String.trim()
    |> String.split("\n")
    |> Enum.map(&String.split(&1, " "))
    |> Enum.map(fn [card1, card2] -> [card1, remap_card2(card2)] end)
  end

  def part1 do
    setup()
    |> Enum.map(fn [card1, card2] -> get_score(card1, card2) end)
    |> Enum.sum()
    |> IO.inspect(label: "Part 1")
  end

  def part2 do
    setup()
    |> Enum.map(fn [card1, card2] -> [card1, replace_card(card1, card2)] end)
    |> Enum.map(fn [card1, card2] -> get_score(card1, card2) end)
    |> Enum.sum()
    |> IO.inspect(label: "Part 2")
  end
end

Day2.part1()
Day2.part2()
