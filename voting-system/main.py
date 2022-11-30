from .src.app.adapter.inmemory_vote_repository import InMemoryVoteRepository
from .src.app.domain.vote import Vote


def main():
    vote_repository = InMemoryVoteRepository()

    Vote().save(vote_repository)
    Vote().save(vote_repository)

    print(vote_repository.all())
    print(f"Total votes: {vote_repository.total()}")


if __name__ == "__main__":
    main()
