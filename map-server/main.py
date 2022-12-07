from adapter.inmemory_map_repository import InMemoryMapRepository
from domain.map import Map


def main():
    map_repository = InMemoryMapRepository()

    Map().save(map_repository)

    print(map_repository.all())
    print(f"Total maps: {map_repository.total()}")


if __name__ == "__main__":
    main()
