<template>
  <div class="fluid container col-md-12">
    <div class="form-group form-group-lg panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Pokédex</h3>
      </div>
      <div class="panel-body row">
        <div class="col-md-8">
          <SearchPokemon></SearchPokemon>
        </div>
         <div class="col-md-3">
           <button type="button" class="btn btn-dark" @click="orderList"><i class='fas fa-bowling-ball'></i>Lowest Number(First)</button>
        </div>
      </div>
      <div class="checkbox row">
        <input v-model="editable" type="checkbox">
        <span>Move pokemons</span>
      </div>
    </div>
    <div class="row pokemons-container">
    <div class="col-md-5 one">
      <ul is="draggable" v-model="dimanycPokemonList" class="list-group" :element="'ul'" :options="dragOptions" @start ="isDragging=true" @end="isDragging=false">
        <transition-group type="transition" name="flip-list">
          <li v-for="pokemon in dimanycPokemonList" :key="pokemon.order" class="list-group-item">{{pokemon.name}}
            <span class="badge">{{ pokemon.order }}</span>
          </li>
        </transition-group>
      </ul>
    </div>

    <div class="col-md-5 two">
      <span is="draggable" v-model="pokemonsList2" :element="'span'" :options="dragOptions">
        <transition-group name="no" class="list-group" tag="ul">
          <li v-for="pokemon in pokemonsList2" :key="pokemon.order" class="list-group-item">{{pokemon.name}}
            <span class="badge">{{ pokemon.order }}</span>
          </li>
        </transition-group>
      </span>
    </div>
  </div>
    <!-- <div class="list-group col-md-3 tree">
      <pre>{{ listString }}</pre>
    </div>

    <div class="list-group col-md-3 four">
      <pre>{{ list2String }}</pre>
    </div> -->
  </div>
</template>

<script>

import SearchPokemon from './SearchPokemon';
import draggable from 'vuedraggable';
import { mapState } from 'vuex';

// Component definition
export default {
  components: {
    SearchPokemon,
    draggable,
  },
  data(){
    return {
      pokemonsList2: [],
      editable: true,
      isDragging: false,
      delayedDragging: false,
    }
  },
  computed: {
    ...mapState({
      pokemonsList: state => state.pokemonsList
    }),
    dimanycPokemonList: {
      get: function(){
        var a = this.pokemonsList;
        var b = this.pokemonsList2;
        function comparer(otherArray){
          return function(current){
            return otherArray.filter(function(other){
              return other.name === current.name && other.order === current.order
            }).length === 0;
          }
        }

        var onlyInA = a.filter(comparer(b));
        var onlyInB = b.filter(comparer(a));

        var result = onlyInA.concat(onlyInB);
        return result;
      },
      set: function() {
      }
    },
    dragOptions(){
      return {
        animation: 0,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost"
      };
    },
    listString() {
      return JSON.stringify(this.dimanycPokemonList, null, 2);
    },
    list2String() {
      return JSON.stringify(this.pokemonsList2, null, 2);
    }
  },
  watch: {
    isDragging(newValue) {
      if(newValue){
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    },
  },
  beforeCreate(){
    this.$store.dispatch('actualizePokemons', 50);
  },
  methods: {
    orderList() {
      this.pokemonsList2 = this.pokemonsList2.sort((one, two) => {
        return one.order - two.order;
      });
    },
    onMove({relatedContext, draggedContext}) {
       const relatedElement = relatedContext.pokemon;
       const draggedElement = draggedContext.pokemon;
       return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed);
   }
  }
}
</script>

<style>
  .flip-list-move {
    transition: transform 0.5s;
  }
  .no-move {
    transition: transform 0s;
  }
  .ghost {
    background: #c8ebfb;
    opacity: 0.5;
  }
  .list-group {
    min-height: 20px;
  }
  .list-group-item {
    cursor: move;
  }
  .list-group-item i {
    cursor: pointer;
  }
  i {
    padding: 6px;
  }
  h3 {
    padding-top: 1.5rem;
  }
  .panel-body {
    background-color: #313131;
    color: white;
    padding: 1.5rem;
  }
  .container {
    padding-left: 0PX;
    padding-left: 0PX;
  }
  .checkbox input{
    height: 20px;
    width: 20px;
    margin: 10px;
    left: 40%;
  }
  .checkbox span{
    font-size: 1rem;
    padding-top: 0.5rem;
  }
  button {
    position: absolute;
    top: 20%;
  }
  .checkbox {
    background-color: #616161;
    justify-content: center;
  }
  .one {
    background-color: black;
    float: left;
    padding-bottom: 15px;
    padding-top: 15px;
  }
  .two {
    background-color: black;
    float: right;
    padding-bottom: 15px;
    padding-top: 15px;
  }
  .pokemons-container {
    justify-content: center;
  }
</style>
