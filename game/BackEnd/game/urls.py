from ninja import NinjaAPI, ModelSchema, Schema
from game.models import Game, Player
from game.services import create_game, end_game, score

api = NinjaAPI()

class PlayerSchema(ModelSchema):
    class Meta:
        model = Player
        fields = ('id', 'name', 'score')

class GameSchema(ModelSchema):
    class Meta:
        model = Game
        fields = ('id', 'name', 'turn', 'eneded')

class GameDetailSchema(Schema):
    game: GameSchema
    players: list[PlayerSchema]

class AddPlayers(Schema):
    name: str
    score: int

class AddGame(Schema):
    name: str
    players: list[str]

@api.post("/create_game/", response=GameSchema)
def start_game(request, game: AddGame):
    return create_game(game.name, game.players)

@api.get("/players/{player_id}", response=PlayerSchema)
def add_player(request, player_id: int):
    return Player.objects.get(pk=player_id)

@api.get("/game/{game_id}", response=GameDetailSchema)
def getgame(request, game_id: int):
    game = Game.objects.get(pk=game_id)
    players = game.players.all()
    return {"game": game, "players": players}

class UpdateScoreSchema(Schema):
    score: int

@api.put("/players/{player_id}/score", response=PlayerSchema)
def update_player_score(request, player_id: int, data: UpdateScoreSchema):
    return score(player_id, data.score)

@api.put("/game/{game_id}/end", response=GameSchema)
def end(request, game_id: int):
    return end_game(game_id)
