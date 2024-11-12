from game.models import Game, Player
from random import randint


def create_game(name : str,Pnames : list[str]):
    game = Game.objects.create(name=name)
    for Pname in Pnames:
        Player.objects.create(name=Pname, game=game)
    return game

def get_Players(game_id):
    game = Game.objects.get(pk=game_id)
    players = game.players.all() 
    return players

def score(player_id, score):
    player = Player.objects.get(pk=player_id)
    player.score = score
    player.save()
    return player

def end_game(game_id):
    game = Game.objects.get(pk=game_id)
    game.eneded = True
    game.save()
    return game
