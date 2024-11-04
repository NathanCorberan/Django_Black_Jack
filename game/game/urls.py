
from ninja import NinjaAPI, ModelSchema, Schema
from game.models import Game, Player
from game.services import create_game,get_Players

api = NinjaAPI()

class GameSchema(ModelSchema):
    class Meta:
        model = Game
        fields = ('name', 'turn', 'eneded')

class PlayerSchema(ModelSchema):
    class Meta:
        model = Player
        fields = ('name', 'score')

class GameDetailSchema(Schema):
    game: GameSchema
    players: list[PlayerSchema]

class addPlayers(Schema):
    name :str
    score : int

class addGame(Schema):
    name:str
    players : list[str]

@api.post("/create_game/", response=GameSchema)
def start_game(request, game:addGame ):
    return create_game(game.name, game.players)
    #return Game.objects.create(name=game.name)

@api.get("/players/{player_id}", response=PlayerSchema)
def add_player(request, player_id : int):
    return Player.objects.get(pk=player_id)

@api.get("/game/{game_id}", response=GameDetailSchema)
def getgame(request, game_id: int):
    game = Game.objects.get(pk=game_id)
    players = get_Players(game_id)
    return {"game": game, "players": players}
