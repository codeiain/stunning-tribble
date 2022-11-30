from typing import List

from ..domain.vote import Vote
from ..domain.vote_repository import VoteRepository


class InMemoryVoteRepository(VoteRepository):
    def __init__(self):
        self.votes = []

    def add(self, vote: Vote) -> Vote:
        self.votes.append(vote)
        return vote

    def all(self) -> List[Vote]:
        return self.votes

    def total(self) -> int:
        return len(self.votes)
